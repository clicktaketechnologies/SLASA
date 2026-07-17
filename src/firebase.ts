import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// Use the provided firestoreDatabaseId if it exists, otherwise default to '(default)'
const databaseId = firebaseConfig.firestoreDatabaseId || '(default)';
export const db = getFirestore(app, databaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test and fallback logic
async function testConnection() {
  try {
    // Use 'pages' collection which is already public in rules
    await getDocFromServer(doc(db, 'pages', 'health-check'));
    console.log("Firestore connection successful with database:", databaseId);
  } catch (error: any) {
    // If it's just 'not-found', the connection is actually working
    if (error.code === 'not-found' || (error.message && error.message.includes('not-found'))) {
      console.log("Firestore connection successful (document not found, but connection established)");
      return;
    }
    
    console.error("Firestore connection attempt failed:", error.message);
    if (error.message.includes('insufficient permissions')) {
      console.warn("Permission denied for connection test. This might be expected if the test path is restricted.");
    } else if (error.message.includes('the client is offline') || error.message.includes('Could not reach')) {
      console.warn("Please check your Firebase configuration. If the error persists, the firestoreDatabaseId might be incorrect.");
    }
  }
}
testConnection();

export default app;

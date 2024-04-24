import {
  ServiceAccount,
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccount.json";
import { Auth, getAuth } from "firebase-admin/auth";

let firestore: Firestore | undefined = undefined;
let auth: Auth | undefined = undefined;

const currentApps = getApps();
if (currentApps.length <= 0) {
  const app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

  firestore = getFirestore(app);
  auth = getAuth(app);
} else {
  firestore = getFirestore(currentApps[0]);
  auth = getAuth(currentApps[0]);
}

export { firestore, auth };

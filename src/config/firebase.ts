import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const ROOT_KEY_FILENAME = 'studyplannerapp-1123a-firebase-adminsdk-fbsvc-a231408216.json';

function tryInitFromPath(p: string) {
  if (!p) return false;
  try {
    const abs = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
    if (!fs.existsSync(abs)) return false;
    const raw = fs.readFileSync(abs, 'utf8');
    const cred = JSON.parse(raw);
    admin.initializeApp({ credential: admin.credential.cert(cred) });
    return true;
  } catch (e) {
    return false;
  }
}

const envPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
if (envPath && tryInitFromPath(envPath)) {

} else if (tryInitFromPath(path.resolve(process.cwd(), ROOT_KEY_FILENAME))) {

} else {
  try {
    admin.initializeApp();
  } catch (e) {

  }
}

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;

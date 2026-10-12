import {initializeApp,getApps} from "firebase/app";
import {getAuth,signInAnonymously,signInWithPopup,signInWithCredential,linkWithPopup,linkWithCredential,GoogleAuthProvider,EmailAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,sendEmailVerification,updateProfile,signOut} from "firebase/auth";
import {getFirestore,doc,getDoc,setDoc} from "firebase/firestore";
const cfg={apiKey:process.env.NEXT_PUBLIC_FB_API_KEY,authDomain:process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,projectId:process.env.NEXT_PUBLIC_FB_PROJECT_ID,appId:process.env.NEXT_PUBLIC_FB_APP_ID};
const app=()=>getApps()[0]||initializeApp(cfg);
export const A=()=>getAuth(app());

// ---------- login helpers (one place = easy maintenance) ----------
export async function google(){
 const p=new GoogleAuthProvider(),u=A().currentUser;
 if(u?.isAnonymous){ // guest -> keep their progress
  try{return await linkWithPopup(u,p)}catch(e){
   if(e.code==="auth/credential-already-in-use")return signInWithCredential(A(),GoogleAuthProvider.credentialFromError(e));
   throw e}
 }
 return signInWithPopup(A(),p);
}
export const guest=async()=>{if(!A().currentUser)await signInAnonymously(A())};
export async function signup(name,email,pw){
 const u=A().currentUser;let c;
 if(u?.isAnonymous)c=(await linkWithCredential(u,EmailAuthProvider.credential(email,pw))).user;
 else c=(await createUserWithEmailAndPassword(A(),email,pw)).user;
 if(name)await updateProfile(c,{displayName:name});
 try{await sendEmailVerification(c)}catch(e){console.warn("verification email failed",e)}
 if(typeof window!=="undefined")dispatchEvent(new Event("lk_auth_sync"));
 return c;
}
export const resendVerify=async()=>{const u=A().currentUser;if(u)await sendEmailVerification(u)};
export const emailLogin=(e,p)=>signInWithEmailAndPassword(A(),e,p);
export const resetPw=e=>sendPasswordResetEmail(A(),e);
export const logout=()=>signOut(A());

const M={
 "auth/invalid-credential":"Wrong email or password. Fingers slipped? 😅",
 "auth/wrong-password":"Wrong password. Fingers slipped? 😅",
 "auth/user-not-found":"No account with that email. Sign up first? 🐣",
 "auth/email-already-in-use":"This email already has an account. Try logging in 😎",
 "auth/credential-already-in-use":"This account is already registered. Try logging in 😎",
 "auth/weak-password":"Password needs 6+ characters 💪",
 "auth/invalid-email":"That email looks funny 🤔",
 "auth/popup-closed-by-user":"You closed the popup. Shy? 🙈",
 "auth/popup-blocked":"Popup was blocked by your browser. Please allow popups 🪟",
 "auth/cancelled-popup-request":"Only one login request at a time! ✋",
 "auth/too-many-requests":"Slow down speedy! Try again in a bit ⏳",
 "auth/network-request-failed":"Network error. Check your internet connection 🌐",
 "auth/unauthorized-domain":"Add this site's domain in Firebase → Authentication → Settings → Authorized domains",
 "auth/missing-password":"Type a password first 🔑"
};
export const nice=e=>M[e.code]||"Oops: "+(e.code||e.message);

// ---------- progress in Firestore: users/{uid} ----------
export async function loadData(uid){try{const s=await getDoc(doc(getFirestore(app()),"users",uid));return s.exists()?s.data():null}catch{return null}}
export async function saveData(uid,d){try{await setDoc(doc(getFirestore(app()),"users",uid),d)}catch(e){console.warn("save failed",e)}}

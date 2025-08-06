import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore, collection, getDocs, deleteDoc, doc, addDoc
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
  // 🔒 너의 Firebase 설정으로 교체해줘
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const requestsContainer = document.getElementById('requestsContainer');

onAuthStateChanged(auth, user => {
  if (user && user.uid === 'YEc1lNuIhScW74PlLIh214oALXr2') {
    loadRequests();
  } else {
    alert('관리자만 접근할 수 있습니다.');
    window.location.href = 'index.html';
  }
});

async function loadRequests() {
  const querySnapshot = await getDocs(collection(db, "requests"));
  requestsContainer.innerHTML = "";

  if (querySnapshot.empty) {
    requestsContainer.innerHTML = "<p>요청이 없습니다.</p>";
    return;
  }

  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const requestEl = document.createElement("div");
    requestEl.className = "request-item";
    requestEl.innerHTML = `
      <p><strong>제목:</strong> ${data.title || "(제목 없음)"}</p>
      <p><strong>유튜브 링크:</strong> <a href="${data.youtube}" target="_blank">${data.youtube}</a></p>
      <p><strong>버튜버:</strong> ${data.vtuber || "(없음)"}</p>
      <button class="uploadBtn">업로드</button>
      <button class="deleteBtn">삭제</button>
    `;

    // 업로드 처리
    requestEl.querySelector(".uploadBtn").addEventListener("click", async () => {
      await addDoc(collection(db, "songs"), data);
      await deleteDoc(doc(db, "requests", docSnap.id));
      alert("업로드 및 요청 삭제 완료!");
      loadRequests();
    });

    // 삭제 처리
    requestEl.querySelector(".deleteBtn").addEventListener("click", async () => {
      await deleteDoc(doc(db, "requests", docSnap.id));
      alert("요청 삭제 완료!");
      loadRequests();
    });

    requestsContainer.appendChild(requestEl);
  });
}

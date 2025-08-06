import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const songList = document.getElementById("song-list");
const searchInput = document.getElementById("search");

async function fetchSongs() {
  const querySnapshot = await getDocs(collection(db, "songs"));
  songList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const title = data.title;
    const vtuber = data.vtuber;
    const link = data.link;

    let videoId = "";
    try {
      const url = new URL(link);
      if (url.hostname === "youtu.be") {
        videoId = url.pathname.substring(1);
      } else {
        videoId = url.searchParams.get("v");
      }
    } catch (e) {
      console.error("유튜브 링크 파싱 실패:", link);
    }

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const songElement = document.createElement("div");
    songElement.className = "song";
    songElement.innerHTML = `
      <h3>${title} - ${vtuber}</h3>
      <a href="${link}" target="_blank">
        <img src="${thumbnailUrl}" alt="썸네일" width="320" />
      </a>
    `;

    songList.appendChild(songElement);
  });
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const songs = document.querySelectorAll(".song");
  songs.forEach(song => {
    const text = song.innerText.toLowerCase();
    song.style.display = text.includes(keyword) ? "block" : "none";
  });
});

fetchSongs();
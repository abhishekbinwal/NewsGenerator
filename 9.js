document.addEventListener("DOMContentLoaded", () => {
  const newsText = document.getElementById("news-text");
  const Nbtn = document.getElementById("Nbutton");
  const Cbtn = document.getElementById("Cbutton");
  const main = document.getElementById("main-container");

  //   gone to newsapi.org and registered there and got my api keys ..
  const apiKey = "write keys";
  const url = `https://newsapi.org/v2/everything?q=India&sortBy=publishedAt&apiKey=${apiKey}`;

  Nbtn.addEventListener("click", async () => {
    main.classList.add("rotate");
    try {
      const news = await getNews();
      newsText.innerHTML = news;
    } catch (error) {
      newsText.innerHTML = "News not available, something went wrong!!!";
      console.error(error);
    }
    setTimeout(() => {
      main.classList.remove("rotate");
    }, 600);
  });

  //   fetch news
  async function getNews() {
    const res = await fetch(url);
    const data = await res.json();
    const articles = data.articles;

    if (articles && articles.length > 0) {
      const random = Math.floor(Math.random() * articles.length);
      return articles[random].title;
    } else {
      return "No news found..";
    }
  }

  //   copy news
  Cbtn.addEventListener("click", () => {
    const Lnews = newsText.innerHTML;
    if (Lnews.trim() !== "") {
      navigator.clipboard
        .writeText(Lnews)
        .then(() => {
          Cbtn.innerText = "Copied News ✔";
          alert("Copied to clipboard");
          setTimeout(() => {
            Cbtn.innerText = "Copy News";
          }, 1500);
        })
        .catch((err) => {
          console.error("Failed to copy news:", err);
          Cbtn.innerText = "Failed X";
          setTimeout(() => {
            Cbtn.innerText = "Copy News";
          }, 1500);
        });
    }
  });
});

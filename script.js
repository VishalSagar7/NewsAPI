const API_KEY = "da23929a1033414d9f2ac34f09db4a73";
const url = "https://newsapi.org/v2/everything?q=";
fetchNews("world");
fetchNews("world")

async function fetchNews(query) {
    try {
        const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}


function bindData(articles){

    const cardsContainer = document.getElementById("cards-container");
    const newsCardTamplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML="";

    articles.forEach(article=>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTamplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone)
    });

}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.textContent = article.title;
    newsDesc.textContent = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-us", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.textContent = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"-blank");
    })
}

const currentSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const searchBtn = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchBtn.addEventListener('click',()=>{
    const query = searchText.value ;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
});
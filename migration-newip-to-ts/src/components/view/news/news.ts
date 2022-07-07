import './news.css';
import { NewsInterface, INews } from '../../../types/news';
import { generatePlaceholder } from '../../../utils';

const LIMIT = 10;

class News implements NewsInterface {
    draw(data: INews[]) {
        const news = data.length >= LIMIT ? data.filter((_item, idx) => idx < LIMIT) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp) {
                const newsClone = <HTMLTemplateElement>newsItemTemp.content.cloneNode(true);

                if (idx % 2) {
                    newsClone.querySelector('.news__item')?.classList.add('alt');
                }

                const newsMetaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
                if (newsMetaPhoto) {
                    newsMetaPhoto.style.backgroundImage = `url(${
                        item.urlToImage || generatePlaceholder(item.source.name)
                    })`;
                }

                const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
                if (newsMetaAuthor) {
                    newsMetaAuthor.textContent = item.author || item.source.name;
                }

                const newsMetaDate = newsClone.querySelector('.news__meta-date');
                if (newsMetaDate) {
                    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }

                const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
                if (newsDescriptionTitle) {
                    newsDescriptionTitle.textContent = item.title;
                }

                const newsDescriptionSource = newsClone.querySelector('.news__description-source');
                if (newsDescriptionSource) {
                    newsDescriptionSource.textContent = item.source.name;
                }

                const newsDescriptionContent = newsClone.querySelector('.news__description-content');
                if (newsDescriptionContent) {
                    newsDescriptionContent.textContent = item.description;
                }

                const newsReadMore = newsClone.querySelector('.news__read-more a');
                if (newsReadMore) {
                    newsReadMore.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            }
        });
        const newsList = document.querySelector('.news');
        if (newsList) {
            newsList.innerHTML = '';
            newsList?.appendChild(fragment);
        }
    }
}

export default News;

import './sources.css';
import { ISources, SourcesInterface } from '../../../types/sources';

class Sources implements SourcesInterface {
    draw(data: ISources[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone = <HTMLTemplateElement>sourceItemTemp.content.cloneNode(true);
                const sourceItemName = sourceClone.querySelector('.source__item-name');
                if (sourceItemName) {
                    sourceItemName.textContent = item.name;
                }
                sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        const sources = document.querySelector('.sources');
        sources?.append(fragment);

        const firstSource: HTMLElement | null | undefined = <HTMLElement>sources?.firstElementChild;
        if (firstSource) {
            firstSource.click();
            firstSource.classList.add('active');
        }
    }
}

export default Sources;

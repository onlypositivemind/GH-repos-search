interface Item {
	full_name: string;
	description: string | null;
	clone_url: string;
}

const input = document.querySelector('input'),
	button = document.querySelector('button'),
	outputBlock = document.querySelector('.hero__cards'),
	quantityBlock = document.querySelector('.hero__quantity');

const template = (items: Item[]) => {
	items.map(item => {
		if (outputBlock) {
			return outputBlock.insertAdjacentHTML('beforeend', `
				<div class="hero__card card">
				<img src="../src/assets/folder.svg" alt="folder image">
					<div class="card__info">
						<a target="_blank" href="${item.clone_url}" class="card__link">
						${item.full_name}
						</a>
						<p class="card__description">
						${item.description ? item.description : 'Without description'}
						</p>
					</div>
				</div>
			`);
		}
	});
};

const renderEmptyResults = () => {
	if (quantityBlock) {
		quantityBlock.textContent = 'По вашему запросу ничего не найдено';
	}
};

const renderCount = (totalCount: number | null) => {
	if (totalCount === 0) {
		renderEmptyResults();
		return;
	}
	
	if (typeof totalCount === 'number' && quantityBlock) {
		quantityBlock.textContent = `Найдено ${totalCount} результатов`;
	}
};

const clearing = () => {
	if (quantityBlock && outputBlock) {
		quantityBlock.textContent = outputBlock.innerHTML = '';
	}
};

const disableSearch = (isDisabled: boolean) => {
	if (button && input) {
		button.disabled = input.disabled = isDisabled;
	}
};

const onSubmitStart = () => {
	if (quantityBlock) {
		quantityBlock.textContent = 'Загрузка...';
	}
};

const renderError = (message: string) => {
	if (quantityBlock) {
		quantityBlock.textContent = `Произошла ошибка.\n${message}`;
	}
};

const API_URL = 'https://api.nomoreparties.co/github-search?per_page=15&sort=stars&q=';

const getData = async (url: string): Promise<{ total_count: number | null, items: Item[] }> => {
	try {
		const res = await fetch(url);
		return await res.json();
	} catch (error) {
		error instanceof Error && renderError(error.message);
		return { total_count: null, items: [] };
	} finally {
		disableSearch(false);
	}
};

const onSubmit = async () => {
	const search = input?.value || '';
	
	if (search.trim()) {
		disableSearch(true);
		clearing();
		onSubmitStart();
		
		const { total_count, items } = await getData(API_URL + search);
		renderCount(total_count);
		items && template(items);
	}
};

button?.addEventListener('click', onSubmit);

input?.addEventListener('keypress', event => {
	if (event.code === 'Enter') {
		onSubmit();
	}
});

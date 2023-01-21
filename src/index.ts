(function() {
	// Globals
	const input = document.querySelector('input'),
		button = document.querySelector('button'),
		outputBlock = document.querySelector('.hero__cards'),
		quantityBlock = document.querySelector('.hero__quantity'),
		loader = document.querySelector('.loader');
	
	interface Item {
		full_name: string;
		description: string | null;
		clone_url: string;
	}

// Basic Logic
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

// Async Logic
	const API_URL = 'https://api.nomoreparties.co/github-search?per_page=15&sort=stars&q=';
	let search = '';
	let limit = 0;
	
	const getData = async (search: string, page = 1): Promise<{ total_count: number | null, items: Item[] }> => {
		try {
			const res = await fetch(API_URL + search + `&page=${page}`);
			return await res.json();
		} catch (error) {
			error instanceof Error && renderError(error.message);
			return { total_count: null, items: [] };
		} finally {
			disableSearch(false);
		}
	};
	
	const onSubmit = async () => {
		const value = input?.value || '';
		
		if (value.trim()) {
			search = value;
			disableSearch(true);
			clearing();
			onSubmitStart();
			
			const { total_count, items } = await getData(value);
			renderCount(total_count);
			items && template(items);
			
			if (total_count) {
				limit = Math.ceil(total_count / 15);
			}
			
			const lastCard = document.querySelector('.hero__card:last-child');
			if (lastCard) {
				infiniteObserver.observe(lastCard);
			}
		}
	};

// Attach Events
	button?.addEventListener('click', onSubmit);
	
	input?.addEventListener('keypress', event => {
		if (event.code === 'Enter') {
			onSubmit();
		}
	});

// Observer Logic
	let nextPage = 2;
	
	const infiniteObserver = new IntersectionObserver(
		([entry], observer) => {
			if (entry.isIntersecting) {
				observer.unobserve(entry.target);
				if (nextPage <= limit) {
					loadOnScroll(nextPage++);
				}
			}
		}, {});
	
	const loadOnScroll = async (page: number) => {
		if (search) {
			try {
				loader && loader.classList.remove('hidden');
				const res = await fetch(API_URL + search + `&page=${page}`);
				const { items } = await res.json();
				loader && loader.classList.add('hidden');
				items && template(items);
				
				const lastCard = document.querySelector('.hero__card:last-child');
				if (lastCard) {
					infiniteObserver.observe(lastCard);
				}
			} catch (error) {
				error instanceof Error && console.log(error);
			}
		}
	};
	
})();
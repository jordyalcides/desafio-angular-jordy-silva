interface ComicDataWrapper {
	code?: number,
	status?: string,
	copyright?: string,
	attributionText?: string,
	attributionHTML?: string,
	data: ComicDataContainer,
	etag?: string,
}

interface ComicDataContainer {
	offset?: number,
	limit?: number,
	total?: number,
	count?: number,
	results: Array<Comic>
}

interface Comic {
	id?: number,
	digitalId?: number,
	title?: string,
	issueNumber?: number,
	variantDescription?: string,
	description?: string,
	modified?: Date,
	isbn?: string,
	upc?: string,
	diamondCode?: string,
	ean?: string,
	issn?: string,
	format?: string,
	pageCount?: number,
	resourceURI?: string,
	urls?: Array<Url>,
	prices?: Array<ComicPrice>
	thumbnail?: Image
	characters?: CharacterList
}

interface ComicPrice {
	type?: string,
	price?: number
}

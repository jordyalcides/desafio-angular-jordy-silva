type ComicsOrderBy =
	| 'focDate'
	| '-focDate'
	| 'onsaleDate'
	| '-onsaleDate'
	| 'title'
	| '-title'
	| 'issueNumber'
	| '-issueNumber'
	| 'modified'
	| '-modified'

type ComicFormatType =
	| 'comic'
	| 'collection'

type ComicFormat =
	| 'comic'
	| 'magazine'
	| 'trade paperback'
	| 'hardcover'
	| 'digest'
	| 'graphic novel'
	| 'digital comic'
	| 'infinite comic'

interface ComicDataWrapper {
	code?: number
	status?: string
	copyright?: string
	attributionText?: string
	attributionHTML?: string
	data: ComicDataContainer
	etag?: string
}

interface ComicDataContainer {
	offset?: number
	limit?: number
	total?: number
	count?: number
	results: Array<Comic>
}

interface Comic {
	id?: number
	digitalId?: number
	title?: string
	issueNumber?: number
	variantDescription?: string
	description?: string
	modified?: Date
	isbn?: string
	upc?: string
	diamondCode?: string
	ean?: string
	issn?: string
	format?: string
	pageCount?: number
	resourceURI?: string
	urls?: Array<Url>
	series?: SeriesSummary
	prices?: Array<ComicPrice>
	thumbnail?: Image
	characters?: CharacterList
}

interface SeriesSummary {
	resourceURI?: string
	name?: string
}

interface ComicPrice {
	type?: string
	price?: number
}

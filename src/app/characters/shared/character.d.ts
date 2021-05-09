type CharactersOrderBy = 'name' | '-name' | 'modified' | '-modified'

interface CharacterDataWrapper {
	code?: number
	status?: string
	copyright?: string
	attributionText?: string
	attributionHTML?: string
	data: CharacterDataContainer
	etag?: string
}

interface CharacterDataContainer {
	offset?: number
	limit?: number
	total?: number
	count?: number
	results: Array<Character>
}

interface Character {
	id?: number
	name?: string
	description?: string
	modified?: Date
	resourceURI?: string
	urls?: Array<Url>
	thumbnail?: Image
}

interface CharacterList {
	available?: number
	returned?: number
	collectionURI?: string
	items?: Array<CharacterSummary>
}

interface CharacterSummary {
	resourceURI?: string
	name?: string
	role?: string
}

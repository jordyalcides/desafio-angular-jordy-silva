interface CharacterDataWrapper {
	code?: number,
	status?: string,
	copyright?: string,
	attributionText?: string,
	attributionHTML?: string,
	data: CharacterDataContainer,
	etag?: string,
}

interface CharacterDataContainer {
	offset?: number,
	limit?: number,
	total?: number,
	count?: number,
	results: Array<Character>
}

interface Character {
	id?: number,
	name?: string,
	description?: string,
	modified?: Date,
	resourceURI?: string,
	urls?: Array<Url>,
	thumbnail?: Image
}

type Url = {
	type?: string,
	url?: string
}

type Image = {
	path?: string,
	extension?: string
}
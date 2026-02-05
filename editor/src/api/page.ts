import { v4 as uuidv4 } from "uuid"

// --- In-memory mock store (replaces backend) ---
const pagesById = new Map<string, any>()
const publishedById = new Map<string, any>()

function createMockBlock(type: string, overrides: Record<string, any> = {}) {
	return { id: uuidv4(), type, ...overrides }
}

function seedMockPages(origin: string): any[] {
	const blankWithBlocks = {
		id: "mock-blank-blocks",
		type: "blank",
		name: "Blank with building blocks",
		environment: "development",
		linkedPageId: null,
		origin,
		config: {
			buildingBlocks: [
				createMockBlock("block-selector"),
				createMockBlock("title", { text: "Welcome" }),
				createMockBlock("heading", { text: "Section heading" }),
				createMockBlock("text", { text: "Some body text here." }),
				createMockBlock("image", { source: "/public/images/placeholderimage/jpg", position: "left", size: "large" }),
				createMockBlock("button"),
			],
		},
	}

	const blankMinimal = {
		id: "mock-blank-minimal",
		type: "blank",
		name: "Minimal blank",
		environment: "development",
		linkedPageId: null,
		origin,
		config: {
			buildingBlocks: [createMockBlock("block-selector")],
		},
	}

	const richPage = {
		id: "mock-rich",
		type: "blank",
		name: "Rich content page",
		environment: "development",
		linkedPageId: null,
		origin,
		config: {
			buildingBlocks: [
				createMockBlock("block-selector"),
				createMockBlock("title", { text: "Learn something" }),
				createMockBlock("question", {
					content: { displayQuestion: true, text: "What is 2 + 2?", displayImage: false, image: "" },
					answers: [
						{ id: uuidv4(), correct: false, text: "3" },
						{ id: uuidv4(), correct: true, text: "4" },
						{ id: uuidv4(), correct: false, text: "5" },
					],
					outcomes: {
						confirmationButtonText: "Check the answer",
						correct: { message: "Correct.", title: "Great!", type: "success" },
						incorrect: { message: "Try again.", title: "Oops", type: "danger" },
					},
				}),
				createMockBlock("message", { message: "Feedback message.", audio: "", position: "left", color: "rose" }),
			],
		},
	}

	return [blankWithBlocks, blankMinimal, richPage]
}

function ensureMockPages(origin: string): any[] {
	const existing = Array.from(pagesById.values()).filter((p) => p.origin === origin)
	if (existing.length > 0) return existing
	const pages = seedMockPages(origin)
	pages.forEach((p) => pagesById.set(p.id, JSON.parse(JSON.stringify(p))))
	return Array.from(pagesById.values()).filter((p) => p.origin === origin)
}

export async function getPage(id: string) {
	const page = pagesById.get(id)
	if (page) return JSON.parse(JSON.stringify(page))
	// Return first mock page so designer doesn't break when opening by id
	const anyOrigin = "mock@local"
	ensureMockPages(anyOrigin)
	const first = pagesById.values().next().value
	return first ? JSON.parse(JSON.stringify(first)) : null
}

export async function getPages() {
	const key = "mock@local"
	const pages = ensureMockPages(key)
	return pages.map((p) => JSON.parse(JSON.stringify(p)))
}

export async function createPage(page: any) {
	const copy = JSON.parse(JSON.stringify(page))
	pagesById.set(copy.id, copy)
	return copy
}

export async function generatePage(request: any) {
	// Return a mock generated page (blank with blocks based on "statement")
	const id = uuidv4()
	const page = {
		id,
		type: "blank",
		name: "AI generated",
		environment: "development",
		linkedPageId: null,
		origin: "",
		config: {
			buildingBlocks: [
				createMockBlock("block-selector"),
				createMockBlock("title", { text: "Generated content" }),
				createMockBlock("heading", { text: request?.statement ? String(request.statement).slice(0, 60) : "New page" }),
				createMockBlock("text", { text: "This is mock generated content. Backend was removed." }),
				createMockBlock("button"),
			],
		},
	}
	pagesById.set(id, page)
	return JSON.parse(JSON.stringify(page))
}

export async function updatePage(page: any) {
	const copy = JSON.parse(JSON.stringify(page))
	pagesById.set(copy.id, copy)
	return copy
}

export async function removePage(id: string) {
	pagesById.delete(id)
	publishedById.delete(id)
	return { success: true }
}

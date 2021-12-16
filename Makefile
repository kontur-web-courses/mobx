index.html: slides.md styles.css
	npx cleaver@latest slides.md

slides: index.html

.PHONY: watch
watch:
	npx cleaver@latest watch slides.md

.PHONY: start
start:
	npm i --prefix tasks
	npm start --prefix tasks

.PHONY: update
update:
	npx npm-check@latest tasks -u

.PHONY: fmt format
fmt format:
	npm run format --prefix tasks

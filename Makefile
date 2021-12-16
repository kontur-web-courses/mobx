.PHONY: watch, start, update

index.html: slides.md
	npx @marp-team/marp-cli@latest slides.md -o index.html

slides: index.html

watch:
	npx @marp-team/marp-cli@latest -w slides.md -o index.html

start:
	npm i --prefix tasks
	npm start --prefix tasks

update:
	npx npm-check@latest tasks -u
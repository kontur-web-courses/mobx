.PHONY: start, watch

index.html: slides.md
	npx @marp-team/marp-cli slides.md -o index.html

slides: index.html

watch:
	npx @marp-team/marp-cli -w slides.md -o index.html

start:
	npm i --prefix tasks
	npm start --prefix tasks

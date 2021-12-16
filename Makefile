.PHONY: start

index.html: slides.md
	npx @marp-team/marp-cli slides.md -o index.html

slides: index.html

start:
	npm i --prefix tasks
	npm start --prefix tasks

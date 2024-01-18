install:
	npm install

start:
	npm run start-all

clean:
	rm -rf build

build: clean
	npm run build-all

lint:
	npx eslint .

fix:
	npx eslint . --fix

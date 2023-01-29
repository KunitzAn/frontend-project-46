install:
	npm ci

gendiff:
	node ./bin/gendiff.js

gendiff -h:
	node ./bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage

plain:
	gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json

json:
	gendiff --format json __fixtures__/file1.json __fixtures__/file2.json

stylish:
	gendiff --format stylish __fixtures__/file1.json __fixtures__/file2.json

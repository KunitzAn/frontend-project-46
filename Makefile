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
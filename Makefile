build:
	npm run build
dev:
	npm run dev
format:
	npm run format
lint:
	npm run lint
lintfix:
	npm run lintfix
test:
	npm run test
test_watch:
	npm run test:watch
test_coverage:
	npm run test:coverage
test_integration:
	npm run test:integration
test_domains:
	npm run test:domains
test_billing:
	npm run test:billing
test_certificates:
	npm run test:certificates
test_run:
	npm run test:run
prepublishOnly:
	npm run prepublishOnly

patch:
	npm version patch
minor:
	npm version minor
major:
	npm version major
publish:
	npm publish --access public

release: prepublishOnly build publish

wc:
	wc -l test/*.ts src/*.ts src/**/*.ts
wcall:
	wc -l ./*.{ts,ts,md} src/*.{ts,ts} src/*/*.{ts,ts}

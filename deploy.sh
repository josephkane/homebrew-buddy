#! /bin/sh
git checkout -b gh-temp
# gulp build
echo '!app/lib' >> .gitignore
git add -A
git commit -m "lib for gh-pages"
git subtree split --prefix app -b gh-pages
git push origin gh-pages --force
git checkout master
git branch -D gh-temp
git branch -D gh-pages
bower install

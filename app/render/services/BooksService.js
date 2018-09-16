define([
        'app',
        'modules/module',
        'services/StorageService'
    ], function (app) {
        'use strict';

        app.factory('Books', ['$rootScope', 'Storage',
            function ($rootScope, Storage) {

                const _search = require('electron-in-page-search').default;
                const _store = Storage.Store;
                const _knownBooks = [
                    { snippet: 'regel.', label: 'Die Regeln' },
                    { snippet: 'jenseits.der.grenzen', label: 'Jenseits der Grenzen' },
                    { snippet: 'selenia', label: 'Selenia' },
                    { snippet: 'mondstahl', label: 'Mondstahlklingen' },
                    { snippet: 'bestienmeister', label: 'Bestienmeister' },
                    { snippet: 'bestien.und.ungeheuer', label: 'Bestien und Ungeheuer' },
                    { snippet: 'selenia', label: 'Selenia' },
                    { snippet: 'die.g.{1,2}tter', label: 'Die Götter' },
                    { snippet: 'dakardsmyr', label: 'Dakardsmyr' },
                    { snippet: 'zhoujiang', label: 'Zhoujiang' }
                ];

                let _books = [];
                let _isLoaded = false;
                let _selected = '';

                let _processPdfs = function (books) {
                    let known = angular.copy(_knownBooks);
                    for(let i = 0; i < books.length; i++) {
                        let fileName = books[i].fileName;
                        fileName = fileName.toLocaleLowerCase();
                        for (let j = 0; j < known.length; j++) {
                            let rex = new RegExp(known[j].snippet);
                            if (fileName.match(rex)) {
                                books[i].label = known[j].label;
                                known.splice(j, 1);
                                j--;
                                break;
                            }
                            if (known.length <= 0) {
                                break;
                            }
                        }
                    }
                    return books;
                };

                let _loadBooks = function () {
                    _store.loadBooks(function (books) {
                        _books = _processPdfs(books);
                        $rootScope.$emit('booksLoadingDone');
                    }, this);
                };

                let _searcher = undefined;

                _loadBooks();

                return {
                    isLoaded: function () {
                        return _isLoaded;
                    },
                    subscribeLoadingDone: function (scope, handler) {
                        scope.handler$booksLoadingDone = $rootScope.$on('booksLoadingDone', handler);
                        scope.$on('$destroy', function () {
                            scope.handler$booksLoadingDone();
                        })
                    },
                    subscribeBookSelected: function (scope, handler) {
                        scope.handler$bookSelected = $rootScope.$on('bookSelected', handler);
                        scope.$on('$destroy', function () {
                            scope.handler$bookSelected();
                        })
                    },
                    loadBooks: _loadBooks,
                    books: function () {
                        return _books;
                    },
                    setSelected: function (file) {
                        _selected = file;
                        $rootScope.$emit('bookSelected');
                    },
                    selected: function () {
                        return _selected;
                    },
                    search: function () {
                        return _search;
                    },
                    searcher: function (webView) {
                        if (!_searcher) {
                            _searcher = _search(webView);
                        } else {
                            _searcher.searchTarget = webView;
                        }
                        return _searcher;
                    }
                };

            }]);
    }
);
app.factory('PostFactory', function ($http, $q) {
    var factory = {
        posts: false,
        getPosts: function () {
            var defferd = $q.defer();
            if (factory.posts !== false) {
                defferd.resolve(factory.posts);                        
            } else {
                $http.get('posts.json').then(function (data, status) {
                    factory.posts = data.data;
                    defferd.resolve(factory.posts)
                }, function (data, status) {
                    defferd.reject('Impossible')
                })
            }
            return defferd.promise;
        },
        getPost: function (id) {
            var defferd = $q.defer();
            var post = {}
            var posts = factory.getPosts().then(function (posts) {
                angular.forEach(posts, function (value, key) {
                    if (value.id == id) {
                        post = value;
                    }
                });
                defferd.resolve(post)
            }, function (msg) {
                defferd.reject(msg)
            })

            return defferd.promise;
        }
    }
    return factory;
})
$(document).ready(function() {
    function getUserInfo(username) {
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            method: 'get',
            success: success,
            error: profileError,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Token " + '433eee1eff58507bd3d827a8d6b986ab199d6348');
            }
        });
    }

    function profileError(err) {
        console.log(err.responseText);
    }
    function success(resp) {
        console.log('success',resp);
        var profileImageFill = `
        <img src="${resp.avatar_url}" height="230" width="230"/>
        `;
        var profileUserNames = `
        <h1>${resp.name}</h1>
        <h2>${resp.login}</h2>
        `;
        var profileLocations = `
        <li><i class="fa fa-map-marker"></i> ${resp.location}</li>
            <li><i class="fa fa-envelope-o"></i>${resp.email}</li>
            <li><i class="fa fa-link"></i><a href="http://mkeas.org">${resp.blog}</a></li>
            <li><i class="fa fa-clock-o"></i>${resp.created_at}</li>
        `;

        $("#profileimage").html(profileImageFill);
        $("#fullnameandusername").html(profileUserNames);
        $("#userlocations").html(profileLocations);
    }

    function getUserRepos(username) {
        $.ajax({
            url: 'https://api.github.com/users/' + username + '/repos',
            method: 'get',
            success: successRepo,
            error: error,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Token " + '433eee1eff58507bd3d827a8d6b986ab199d6348');
            }
        });
    }

    // // function successRepo(resp) {
    // //     resp.forEach(function(i){
    // //         $("#repolist").append(`
    // //         <li><a href="${i.html_url}">${i.name}</a></li>
    // //         `)
    // //     })
    // // }
    //
    function successRepo(resp) {
        console.log('resp',resp);
        resp.forEach(function (item) {
            console.log('item',item);
            $("#repolist").append(
                `<li><a href=${item.html_url}>${item.name}</a>
                <p><small>updated at ${item.updated_at}</small></p>
                </li>`
            )
        });


    }

    function error(err) {
        console.log(err.responseText);
    }


    getUserInfo('kjmullen');
    getUserRepos('kjmullen');


});


// arr.forEach(function(value, i, orig){
//   console.log(i);
//   console.log(orig);
//   console.log(value);
// });

    //     dataType: "json",
    //     success: function(result) {
    //         for(var i in result ) {
    //             $("#repo_list").append(
    //                 "<li><a href='" + result[i].html_url + "' target='_blank'>" +
    //                 result[i].name + "</a></li>"
    //             );
    //             console.log("i: " + i);
    //         }
    //         console.log(result);
    //         $("#repo_count").append("Total Repos: " + result.length);
    //     }
    // })
// $(function () {
//     console.log("Let's get ready to party with jQuery!");

//     $("article img").addClass("image-center");

//     $("article p:last-child").remove();

//     $("#title").css("font-size", Math.random() * 100);

//     $("ol").append($("<li>", {text: "I can add to lists with jQuery!"}));

//     $("aside")
//         .empty()
//         .append($("<p>", {text: "Sorry about that list :("}));

//     $(".form-control").on('keyup blur change', function () {
//       let red = $(".form-control").eq(0).val();
//       let blue = $(".form-control").eq(1).val();
//       let green = $(".form-control").eq(2).val();
//       $("body").css("background-color",
//           "rgb(" + red + "," + green + "," + blue + ")");
//     });

//     $("img").on('click', function (e) {
//       $(e.target).remove();
//     });
//   });




let movieList = [];
let currentId = 0;

$(".main-form").on("submit", function (e) {
    e.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieData = { title, rating, currentId };
    const HTMLtoAppend = createMovieDataHTML(movieData);

    currentId++
    movieList.push(movieData);

    $("#movie-table-body").append(HTMLtoAppend);
    $("#new-movie-form").trigger("reset");
});



$("tbody").on("click", ".btn.btn-danger", function (evt) {

    let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data("deleteId"))


    moviesList.splice(indexToRemoveAt, 1)

    $(evt.target)
        .closest("tr")
        .remove();

});


$(".fas").on("click", function (evt) {


    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);


    $("#movie-table-body").empty();


    for (let movie of sortedMovies) {
        const HTMLtoAppend = createMovieDataHTML(movie);
        $("#movie-table-body").append(HTMLtoAppend);
    }


    $(evt.target).toggleClass("fa-sort-down");
    $(evt.target).toggleClass("fa-sort-up");
});


function sortBy(array, keyToSortBy, direction) {
    return array.sort(function (a, b) {

        if (keyToSortBy === "rating") {
            a[keyToSortBy] = +a[keyToSortBy];
            b[keyToSortBy] = +b[keyToSortBy];
        }
        if (a[keyToSortBy] > b[keyToSortBy]) {
            return direction === "up" ? 1 : -1;
        } else if (b[keyToSortBy] > a[keyToSortBy]) {
            return direction === "up" ? -1 : 1;
        }
        return 0;
    });
};



function createMovieDataHTML(data) {
    return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
}



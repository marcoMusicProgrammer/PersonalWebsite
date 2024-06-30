const { body } = require("express-validator")
const { validationResult } = require("express-validator")


const form_validators = [
    body("testo")
    .notEmpty()
    .withMessage("Empty Text")
    .trim(),
    body("mail")
    .notEmpty()
    .withMessage("Empty Mail")
    .bail()
    .isEmail()
    .withMessage("Not a mail")
    .trim(),
    body("titolo")
    .notEmpty()
    .withMessage("Empty Title")
]


const music_validators = [
	body("musicTitle")
		.notEmpty().withMessage("title field is Empty")
		.trim()
		.escape(),
	body("musicVenue")
		.notEmpty().withMessage("Venue field is Empty")
		.trim()
		.escape(),
	body("musicPremiere")
		.isDate().withMessage("specify a Date")
		.bail(),
	body("musicDescription")
		.trim()
		.escape(),

]

const movie_validators = [
	body("movieTitle")
		.notEmpty().withMessage("title field is Empty")
		.trim()
		.escape(),
	body("movieVenue")
		.notEmpty().withMessage("Venue field is Empty")
		.trim()
		.escape(),
	body("moviePremiere")
		.isDate().withMessage("specify a Date")
		.bail(),
	body("movieDescription")
		.trim()
		.escape(),

]

const electroacoustic_validators = [
	body("elTitle")
		.notEmpty().withMessage("title field is Empty")
		.trim()
		.escape(),
	body("elVenue")
		.notEmpty().withMessage("Venue field is Empty")
		.trim()
		.escape(),
	body("elPremiere")
		.isDate().withMessage("specify a Date")
		.bail(),
	body("elDescription")
		.trim()
		.escape(),

]

const portfolio_validators = [
    body("portfolioId")
        .notEmpty().withMessage("id field is Empty")
        .trim()
        .escape(),
	body("portfolioTitle")
		.notEmpty().withMessage("title field is Empty")
		.trim()
		.escape(),
	body("portfolioDescription")
		.trim()
		.escape(),

]

const login_validators = [
    body("password")
        .notEmpty().withMessage("id field is Empty")
        .trim()
        .escape(),

]


module.exports = {
    form_validators,
    music_validators,
    movie_validators,
    electroacoustic_validators,
    portfolio_validators,
	login_validators
}
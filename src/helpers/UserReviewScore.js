function userReviewScore (scores) {

    const scoreExceptional = scores.filter((exceptional) => {
        return exceptional.title === "exceptional"
    });


    const scoreRecommended = scores.filter((recommended) => {
        return recommended.title === "recommended"
    });

    const scoreMeh = scores.filter((meh) => {
        return meh.title === "meh"
    });

    return  Math.round((scoreExceptional[0].percent * 100 + scoreRecommended[0].percent * 75 + scoreMeh[0].percent * 50)/100)
}

export default userReviewScore
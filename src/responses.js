let response = {
    required: {
        message: "Form fields are required",
        code: "TT_001"
    },
    something_went_wrong: {
        message: "Something went wrong",
        code: "TT_002"
    },
    user_not_found: {
        message: "User Not Found",
        code: "TT_002"
    },
    user_found: {
        message: "User Found",
        code: "TT_002"
    },
    login_success: {
        message: "Login was sucessful",
        code: "TT_003"
    },
}

module.exports = { response };

module.exports.failed = (key, errors) => {
    let returnResponse = response[key] == undefined ? {} : response[key];
    returnResponse.status = false;
    errors && errors != key ? returnResponse.error = errors : '';
    return returnResponse
}
module.exports.success = (key, values) => {
    let returnResponse = response[key] == undefined ? {} : response[key];
    returnResponse.status = true;
    values ? returnResponse.values = values : '';
    return returnResponse
}
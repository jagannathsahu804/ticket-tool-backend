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
        code: "TT_003"
    },
    user_found: {
        message: "User Found",
        code: "TT_004"
    },
    record_found: {
        message: "Record Found",
        code: "TT_005"
    },
    No_record_found: {
        message: "No Record Found",
        code: "TT_006"
    },
    save_success: {
        message: "Saved!!",
        code: "TT_007"
    },
    failed_to_save: {
        message: "Failed to save",
        code: "TT_008"
    },
    update_success: {
        message: "Update Success",
        code: "TT_009"
    },
    failed_to_update: {
        message: "Failed to Update",
        code: "TT_010"
    },
    delete_success: {
        message: "Delete Success",
        code: "TT_011"
    },
    failed_to_delete: {
        message: "Failed to Delete",
        code: "TT_012"
    },
    login_success: {
        message: "Login was sucessful",
        code: "TT_013"
    },
    register_success: {
        message: "Registration sucessful",
        code: "TT_014"
    },
    already_registered: {
        message: "User is already registered",
        code: "TT_015"
    }
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
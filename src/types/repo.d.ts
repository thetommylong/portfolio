export interface Repository {
    name:                 string;
    full_name:            string;
    html_url:             string;
    description:          string;
    fork:                 boolean;
    created_at:           string;
    updated_at:           string;
    pushed_at:            string;
    homepage?:            null | string;
    language?:            null | string;
    license?:             null | License;
}

export interface License {
    key:     string;
    name:    string;
    spdx_id: string;
    url:     string;
}
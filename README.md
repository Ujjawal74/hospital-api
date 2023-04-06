# Hospital API Management

API for the doctors of a Hospital which has been allocated by the
govt for testing and quarantine + well being of COVID-19 patients

## Endpoints?

- [POST] /doctors/register → with username and password
- - [req body] => {"name" : "ujjawal biswas","password" : "hello123"}

- [POST] /doctors/login → returns the JWT to be used
- - [req body] => {"name" : "ujjawal biswas","password" : "hello123"}

- [POST] /patients/register
- - [req body] => {"name" : "honey"}

- [POST] /patients/:id/create_report
- - [req body] => {"status" : "Negative"}

- [GET] /patients/:id/all_reports → List all the reports of a patient oldest to latest
- - Example => http://localhost:8000/patients/6567afa6fa6f6faafagyt78/all_reports

- [GET] /reports/:status → List all the reports of all the patients filtered by a specific status
- - Example => http://localhost:8000/reports/Negative


## Authors

- [@ujjawalbiswas](https://www.linkedin.com/in/ujjawal-biswas-b40611142/)



## License

[MIT](https://choosealicense.com/licenses/mit/)
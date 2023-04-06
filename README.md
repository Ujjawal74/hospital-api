# Hospital API Management

API for the doctors of a Hospital which has been allocated by the
govt for testing and quarantine + well being of COVID-19 patients

## Endpoints?

- [POST] /doctors/register → with username and password
- [POST] /doctors/login → returns the JWT to be used
- [POST] /patients/register
- [POST] /patients/:id/create_report
- [GET] /patients/:id/all_reports → List all the reports of a patient oldest to latest
- [GET] /reports/:status → List all the reports of all the patients filtered by a specific status


## Authors

- [@ujjawalbiswas](https://www.linkedin.com/in/ujjawal-biswas-b40611142/)



## License

[MIT](https://choosealicense.com/licenses/mit/)
import React from 'react';

class Search extends React.Component {

    render() {
 
    return (    
        <div className="bg-secondary mt-4 py-1 rounded">
            <div className="px-5 py-4">
                <h4>Wyszukaj ogłoszenie</h4>
                <form className="needs-validation" noValidate>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="name">Tytuł</label>
                            <input type="text" className="form-control" id="name" placeholder="tytuł" defaultValue="" required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="province">Województwo</label>
                            <input type="text" className="form-control" id="province" placeholder="województwo" defaultValue="" required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="category">Kategoria</label>
                            <input type="text" className="form-control" id="category" placeholder="kategoria" defaultValue="" required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="city">Miasto</label>
                            <input type="text" className="form-control" id="city" placeholder="miasto" required/>
                            <div className="invalid-feedback">
                                Please provide a valid city.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="fromPrice">Cena od</label>
                            <input type="text" className="form-control" id="fromPrice" placeholder="cena od" required/>
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="priceTo">Cena do</label>
                            <input type="text" className="form-control" id="priceTo" placeholder="cena do" required/>
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="fromYardage">Metraż od</label>
                            <input type="text" className="form-control" id="fromYardage" placeholder="metraż od" required/>
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="yardageTo">Metraż do</label>
                            <input type="text" className="form-control" id="yardageTo" placeholder="metraż do" required/>
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="sortBy">Sortuj po</label>
                            <input type="text" className="form-control" id="sortBy" placeholder="sortuj po" required/>
                            <div className="invalid-feedback">
                                Please provide a valid city.
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Wyszukaj</button>
                </form>
         
            </div>
        </div>
    );
    }
}

export { Search };
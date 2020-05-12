import React from   'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import SectorsList from './pages/SectorList';
import SectorsNewEdit from './pages/SectorNewEdit';
import SectorDelete from './pages/SectorDelete';
import IndicatorList from './pages/IndicatorList';
import IndicatorDelete from './pages/IndicatorDelete';
import IndicatorNewEdit from './pages/IndicatorNewEdit';
import UserList from './pages/UserList';
import DeleteUser from './pages/UserDelete';
import UserNewEdit from './pages/UserNewEdit';
import ProjsList from './pages/ProjsList';
import ProjsNewEdit from './pages/ProjectNewEdit';
import PageHome from './pages/PageHome';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PageHome}/>
                <Route path="/sectors" component={SectorsList}/>
                <Route path="/sector/sector" component={SectorsNewEdit}/>
                <Route path="/sector/delete" component={SectorDelete}/>
                <Route path="/indicators" component={IndicatorList}/>
                <Route path="/indicator/delete" component={IndicatorDelete}/>
                <Route path="/indicator/indicator" component={IndicatorNewEdit}/>
                <Route path="/users" component={UserList}/>
                <Route path="/user/delete" component={DeleteUser}/>
                <Route path="/user/user" component={UserNewEdit}/>
                <Route path="/projects" component={ProjsList}/>
                <Route path="/project/project" component={ProjsNewEdit}/>
                
            </Switch>
        </BrowserRouter>
    );

}
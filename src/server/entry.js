// shims needed for Reflect to work
require('harmony-reflect');
require('reflect-metadata');

import {inject, Container, Factory} from 'aurelia-dependency-injection';

const TYPES = {
  IMyDomainService: 'IMyDomainService',
  IApplicationService: 'IApplicationService',
};

class MyDomainService {
  constructor(configuration = {thing: 'nothing'}) {
    this.thing = configuration.thing;
  }

  doSomething() {
    console.log(`doing ${this.thing}`);
  }
}

// THIS WORKS when using registered key without Factor.of
// @inject(TYPES.IMyDomainService)
// class ApplicationService {
//   constructor(myDomainService) {
//     this.domainService = myDomainService;
//     this.domainService.doSomething();
//   }
// }

// THIS WORKS when using class Reference
// @inject(Factory.of(MyDomainService))
// class ApplicationService {
//   constructor(myDomainServiceFactory) {
//     this.domainService = myDomainServiceFactory({thing: 'a real thing'});
//     this.domainService.doSomething();
//   }
// }

// THIS FAILS when using registered key
@inject(Factory.of(TYPES.IMyDomainService))
class ApplicationService {
  constructor(myDomainServiceFactory) {
    this.domainService = myDomainServiceFactory({thing: 'a real thing'});
    this.domainService.doSomething();
  }
}

Meteor.startup(() => {
  const container = new Container();
  container.registerSingleton(TYPES.IMyDomainService, MyDomainService);
  container.registerSingleton(TYPES.IApplicationService, ApplicationService);
  const IApplicationService = container.get(TYPES.IApplicationService);
});


// shims needed for Reflect to work
require('harmony-reflect');
require('reflect-metadata');

import {inject, Container, Factory} from 'aurelia-dependency-injection';

const TYPES = {
  IMyDomainService: 'MyDomainService',
  IApplicationService: 'ApplicationService',
  IConfigurationService: 'ConfigurationService',
};

class MyDomainService {
  constructor(configuration = {thing: 'nothing'}) {
    this.thing = configuration.thing;
  }

  doSomething() {
    console.log(`doing ${this.thing}`);
  }
}

class ConfigurationService {
  constructor() {
    // TODO load the configuration based on some discriminator like an ENVIRONMENT variable
    this.configuration = {
      MyDomainService: {
        thing: 'a real thing'
      }
    };
  }

  configurationFor(service) {
    return this.configuration[service];
  }
}

// FIXME use TYPES.IMyDomainService to decouple the dependency. Blocking issue is being tracked at https://goo.gl/ZKh5zd
@inject(Factory.of(MyDomainService), TYPES.IConfigurationService)
class ApplicationService {
  constructor(myDomainServiceFactory, configurationService) {
    this.domainService = myDomainServiceFactory(configurationService.configurationFor(TYPES.IMyDomainService));
    this.domainService.doSomething();
  }
}

Meteor.startup(() => {
  const container = new Container();
  container.registerSingleton(TYPES.IMyDomainService, MyDomainService);
  container.registerSingleton(TYPES.IApplicationService, ApplicationService);
  container.registerSingleton(TYPES.IConfigurationService, ConfigurationService);
  const IApplicationService = container.get(TYPES.IApplicationService);
});


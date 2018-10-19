/*
 * Copyright 2018 ThoughtWorks, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {MithrilComponent} from "../../../jsx/mithril-component";

import * as m from 'mithril';
import * as styles from "./index.scss";

const classnames = require('classnames/bind').bind(styles);

interface SiteHeaderLinkAttrs {
  isNavLink?: boolean;
  target?: string;
  href?: string;
}

class SiteHeaderLink extends MithrilComponent<SiteHeaderLinkAttrs> {
  view(vnode: m.Vnode<SiteHeaderLinkAttrs>) {
    const classes = classnames({
      [styles.siteNavLink]:    vnode.attrs.isNavLink,
      [styles.siteSubNavLink]: !vnode.attrs.isNavLink,
    });

    return (
      <a class={classes}
         href={vnode.attrs.href || '#'}
         target={vnode.attrs.target || ''}>
        {vnode.children}
      </a>
    );
  }
}

interface Text {
  text?: string
}

interface TextWithLink extends Text {
  href?: string
}

interface SiteNavItemAttrs extends TextWithLink {
  isDropDown?: boolean;
}

class SiteNavItem extends MithrilComponent<SiteNavItemAttrs> {
  view(vnode: m.Vnode<SiteNavItemAttrs>) {
    const dropDownClass = classnames({[styles.isDropDown]: vnode.attrs.isDropDown}, styles.siteNavItem);

    if (!vnode.attrs.isDropDown) {
      return (
        <li class={dropDownClass}>
          <SiteHeaderLink href={vnode.attrs.href}
                          isNavLink={true}>
            {vnode.attrs.text}
          </SiteHeaderLink>
        </li>
      );
    }

    return (
      <li className={dropDownClass}>
        <SiteHeaderLink isNavLink={true}>
          {vnode.attrs.text}
        </SiteHeaderLink>
        <i className={styles.caretDownIcon}/>
        {vnode.children}
      </li>
    );
  }
}

class SiteSubNav extends MithrilComponent<{}> {
  view(vnode: m.Vnode<{}>) {
    return (
      <ul className={styles.siteSubNav}>
        {vnode.children}
      </ul>
    );
  }
}

class SiteSubNavItem extends MithrilComponent<TextWithLink> {
  view(vnode: m.Vnode<TextWithLink>) {
    return (
      <li className={styles.siteSubNavItem}>
        <SiteHeaderLink href={vnode.attrs.href}
                        isNavLink={false}>
          {vnode.attrs.text}
        </SiteHeaderLink>
      </li>
    );
  }
}

class SiteSubNavHeading extends MithrilComponent<Text> {
  view(vnode: m.Vnode<Text>) {
    return (
      <li className={styles.siteSubNavItem}>
        <h5 className={styles.siteSubNavLinkHead}>{vnode.attrs.text}</h5>
      </li>
    );
  }
}

export interface Attrs {
  canViewTemplates: boolean;
  isGroupAdmin: boolean;
  isUserAdmin: boolean;
  canViewAdminPage: boolean;
  showAnalytics: boolean;
}

export default class SiteMenu extends MithrilComponent<Attrs> {
  view(vnode: m.Vnode<Attrs>) {

    const analyticsMenu: JSX.Element | null = vnode.attrs.showAnalytics ?
      <SiteNavItem href="/go/analytics" text="Analytics"/> : null;

    let adminMenu = <SiteNavItem text="Admin"/>;

    if (vnode.attrs.canViewAdminPage) {
      if (vnode.attrs.isUserAdmin) {
        adminMenu = (
          <SiteNavItem isDropDown={true} text="Admin">
            <div className={styles.subNavigation}>
              <SiteSubNav>
                <SiteSubNavItem href="/go/admin/pipelines" text="Pipelines"/>
                <SiteSubNavItem href="/go/admin/templates" text="Templates"/>
                <SiteSubNavItem href="/go/admin/elastic_profiles" text="Elastic Agent Profiles"/>
                <SiteSubNavItem href="/go/admin/config_xml" text="Config XML"/>
                <SiteSubNavItem href="/go/admin/config/server" text="Server Configuration"/>
              </SiteSubNav>
              <SiteSubNav>
                <SiteSubNavItem href="/go/admin/users" text="User Summary"/>
                <SiteSubNavItem href="/go/admin/backup" text="Backup"/>
                <SiteSubNavItem href="/go/admin/plugins" text="Plugins"/>
                <SiteSubNavItem href="/go/admin/package_repositories/new" text="Package Repositories"/>
              </SiteSubNav>
              <SiteSubNav>
                <SiteSubNavHeading text="Security"/>
                <SiteSubNavItem href="/go/admin/security/auth_configs" text="Authorization Configuration"/>
                <SiteSubNavItem href="/go/admin/security/roles" text="Role configuration"/>
              </SiteSubNav>
            </div>
          </SiteNavItem>
        );
      } else if (vnode.attrs.isGroupAdmin) {
        adminMenu = <SiteNavItem isDropDown={true} text="Admin">
          <div className={styles.subNavigation}>
            <SiteSubNav>
              <SiteSubNavItem href="/go/admin/pipelines" text="Pipelines"/>
              <SiteSubNavItem text="/go/admin/templates"/>
              <SiteSubNavItem href="/go/admin/elastic_profiles" text="Elastic Agent Profiles"/>
              <SiteSubNavItem href="/go/admin/config_xml" text="Config XML"/>
              <SiteSubNavItem href="/go/admin/plugins" text="Plugins"/>
              <SiteSubNavItem href="/go/admin/package_repositories/new" text="Package Repositories"/>
            </SiteSubNav>
          </div>
        </SiteNavItem>;
      } else if (vnode.attrs.canViewTemplates) {
        adminMenu = <SiteNavItem isDropDown={true} text="Admin">
          <div className={styles.subNavigation}>
            <SiteSubNav>
              <SiteSubNavItem text="Templates"/>
            </SiteSubNav>
          </div>
        </SiteNavItem>;
      }
    }

    return <nav className={styles.mainMenu}>
      <ul className={styles.siteNav}>
        <SiteNavItem href="/go/pipelines" text="Dashboard"/>
        <SiteNavItem href="/go/agents" text="Agents"/>
        {analyticsMenu}
        {adminMenu}
      </ul>
    </nav>;
  }
}

/*
 * Copyright 2020 ThoughtWorks, Inc.
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
function make_collapsable(container_id) {
    var container_id_selector = "#" + container_id.replace(/\./g,"\\.");
    jQuery(container_id_selector + " .hidereveal_expander").click(function (event) {
        jQuery(container_id_selector).toggleClass("hidereveal_collapsed");
        new ElementAligner().alignAll();
        event.stopPropagation();
    });
}





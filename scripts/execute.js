let port = 3000;
let host = 'localhost';

// let execute_get = async function (report_div, path) {
//     report_div.p('Executing GET ' + path);
//     let fetch_result = await fetch("http://" + host + ":" + port + path);
//     if (!fetch_result.ok) {
//         report_div.p('GET failed.');
//         return null;
//     }
//     let result_json = await fetch_result.json();
//     report_div.p('Received:<br><pre>' + JSON.stringify(result_json) + '</pre>');
//     return result_json;
// }

// let execute_post = async function (report_div, path, data) {
//     report_div.p('Executing POST ' + path + ' with data:<br><pre>' + JSON.stringify(data) + '<pre>');
//     let fetch_result = await fetch('http://' + host + ":" + port + path, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     if (!fetch_result.ok) {
//         report_div.p('POST failed.');
//         return null;
//     }
//     let result_json = await fetch_result.json();
//     report_div.p('Received:<br><pre>' + JSON.stringify(result_json) + '</pre>');
//     return result_json;
// }

// let execute_put = async function (report_div, path, data) {
//     report_div.p('Executing PUT ' + path + ' with data:<br><pre>' + JSON.stringify(data) + '<pre>');
//     let fetch_result = await fetch('http://' + host + ":" + port + path, {
//         method: 'PUT',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     if (!fetch_result.ok) {
//         report_div.p('PUT failed.');
//         return null;
//     }
//     let result_json = await fetch_result.json();
//     report_div.p('Received:<br><pre>' + JSON.stringify(result_json) + '</pre>');
//     return result_json;
// }

// let make_report_div = function () {
//     let report_div = document.createElement('div');
//     report_div.h3 = function (txt) {
//         this.insertAdjacentHTML('beforeend', '<h3>' + txt + '</h3>');
//     }
//     report_div.p = function (txt) {
//         this.insertAdjacentHTML('beforeend', '<p>' + txt + '</p>');
//     }
//     return report_div;
// }

// export let tests = [];

// tests[0] = async function () {
//     let root_node_id;
//     let report_div = make_report_div();

//     let test_result = {
//         report: report_div,
//         score: 0,
//         failed: true
//     };

//     report_div.p('Confirming initial state has exactly one root node with no children and no parents.');

//     let init_node_list = await execute_get(report_div, "/nodes");

//     if (!Array.isArray(init_node_list)) {
//         report_div.p('Expected JSON array result. Test fails.');
//         return test_result;
//     } else if (init_node_list.length != 1) {
//         report_div.p('Expected result array to have length one. Test fails.');
//         return test_result;
//     } else if (!Number.isInteger(init_node_list[0])) {
//         report_div.p('Expected result array to have single integer element. Test fails.');
//         return test_result;
//     }

//     root_node_id = init_node_list[0];

//     report_div.p('Root node seems to have id ' + root_node_id + '. Retrieving and confirming result.');

//     let root_node = await execute_get(report_div, '/nodes/' + root_node_id);

//     if (root_node.children_ids.length != 0) {
//         report_div.p('Expected root node to have no children. Test fails.');
//         return test_result;
//     }

//     let root_node_parents = await execute_get(report_div, '/parents/' + root_node_id);

//     if (root_node_parents.length != 0) {
//         report_div.p('Expected root node to have no parents. Test fails.');
//         return test_result;
//     }

//     test_result.root_node_id = root_node_id;
//     test_result.failed = false;
//     test_result.score = 1;

//     return test_result;
// };

// tests[1] = async function (prior_result) {
//     let report_div = make_report_div();
//     let root_node_id = prior_result.root_node_id;

//     let test_result = {
//         report: report_div,
//         score: 0,
//         failed: true,
//         root_node_id: root_node_id,
//         node_ids: {}
//     };

//     report_div.p('Creating nodes as children of root.');
//     report_div.p('First by using no specified parent.');

//     let post_data = {
//         headline: "Headline A",
//         note: "Note A"
//     };

//     let new_node = await execute_post(report_div, '/nodes', post_data);
//     test_result.node_ids['A'] = new_node.id;

//     if (new_node.headline != post_data.headline) {
//         report_div.p('Headline of expected new node does not match expectations. Test failed');
//         return test_result;
//     } else if (new_node.note != post_data.note) {
//         report_div.p('Note of expected new node does not match expectations. Test failed');
//         return test_result;
//     } else if (!Array.isArray(new_node.children_ids) || new_node.children_ids.length != 0) {
//         report_div.p('Children id array of new node does not match expections. Test failed');
//         return test_result;
//     }
//     let parents = await execute_get(report_div, '/parents/' + new_node.id);

//     if (!Array.isArray(parents) || parents.length != 1 || parents[0] != root_node_id) {
//         report_div.p('Parent array not as expected. Test failed');
//         return test_result;
//     }

//     report_div.p('Now by specifying parent explicitly.');

//     post_data = {
//         headline: "Headline B",
//         note: "Note B",
//         parent_id: root_node_id
//     };

//     new_node = await execute_post(report_div, '/nodes', post_data);
//     test_result.node_ids['B'] = new_node.id;

//     if (new_node.headline != post_data.headline) {
//         report_div.p('Headline of expected new node does not match expectations. Test failed');
//         return test_result;
//     } else if (new_node.note != post_data.note) {
//         report_div.p('Note of expected new node does not match expectations. Test failed');
//         return test_result;
//     } else if (!Array.isArray(new_node.children_ids) || new_node.children_ids.length != 0) {
//         report_div.p('Children id array of new node does not match expections. Test failed');
//         return test_result;
//     }

//     parents = await execute_get(report_div, '/parents/' + new_node.id);

//     if (!Array.isArray(parents) || parents.length != 1 || parents[0] != root_node_id) {
//         report_div.p('Parent array not as expected. Test failed');
//         return test_result;
//     }

//     // Finally check to make sure root_node has two new children.
//     report_div.p('Checking to see if root node now has these new nodes as children.');

//     let root_node = await execute_get(report_div, '/nodes/' + root_node_id);

//     if (!root_node.children_ids.includes(test_result.node_ids['A']) ||
//         !root_node.children_ids.includes(test_result.node_ids['B']) ||
//         root_node.children_ids.length != 2 ||
//         test_result.node_ids['A'] == test_result.node_ids['B']) {
//         report_div.p('Root node children not as expected. Test failed');
//         return test_result;
//     }

//     test_result.score = 1;
//     test_result.failed = false;
//     return test_result;
// }

// tests[2] = async function(prior_result) {
//     let report_div = make_report_div();
//     let root_node_id = prior_result.root_node_id;
//     let node_ids = prior_result.node_ids;

//     let test_result = {
//         report: report_div,
//         score: 0,
//         failed: true,
//         root_node_id: root_node_id,
//         node_ids: node_ids
//     };

//     report_div.p(`
//     Test to make sure you can NOT create a new node with the root node as a child.
//     `);

//     let bogus_node = await execute_post(report_div, '/nodes', {
//         headline: "Bogus node",
//         note: "",
//         parent_id: node_ids['A'],
//         children_ids: [root_node_id]
//     });

//     if (bogus_node != null) {
//         report_div.p('Should have failed, but seems to have worked. Test fails.');
//         return test_result;
//     }

//     report_div.p('Failed as expected.');
//     test_result.score = 1;
//     test_result.failed = false;
//     return test_result;
// }

// tests[3] = async function (prior_result) {
//     let report_div = make_report_div();
//     let root_node_id = prior_result.root_node_id;
//     let node_ids = prior_result.node_ids;

//     let test_result = {
//         report: report_div,
//         score: 0,
//         failed: true,
//         root_node_id: root_node_id,
//         node_ids: node_ids
//     };

//     report_div.p(`
//     This test creates two new nodes at different depths. The first new node (C) is created at depth 2 as
//     a child of node A created before in test 2. The second new node (D) is created at depth 1 as child of the root
//     node. Then we test to see if getting the full node index in depth order has these new nodes included in the 
//     correct order (i.e., D before C). Additionally we test if limiting the depth of the node index to 1 
//     retrieves an index without C which at depth 2 should not be included.`);

//     let node_c = await execute_post(report_div, '/nodes', {
//         headline: "Node C",
//         note: "",
//         parent_id: node_ids['A']
//     });
//     node_ids['C'] = node_c.id;

//     let node_d = await execute_post(report_div, '/nodes', {
//         headline: "Node D",
//         note: "",
//         parent_id: root_node_id
//     });
//     node_ids['D'] = node_d.id;

//     let full_node_index = await execute_get(report_div, '/nodes');
//     if (full_node_index.length != 5 ||
//         (full_node_index.indexOf(node_c.id) != full_node_index.length - 1) ||
//         (full_node_index.indexOf(node_d.id) < 1) ||
//         (full_node_index.indexOf(node_d.id) > 3)) {
//         report_div.p('Node index not as expected. Test failed');
//         return test_result;
//     }
//     let depth_limited_index = await execute_get(report_div, '/nodes?depth=1');
//     if (depth_limited_index.length != 4 ||
//         (depth_limited_index.indexOf(node_c.id) != -1) ||
//         (depth_limited_index.indexOf(node_d.id) < 1)) {
//         report_div.p('Depth limited node index not as expected. Test failed');
//         return test_result;
//     }

//     test_result.score = 1;
//     test_result.failed = false;
//     return test_result;
// }

// tests[4] = async function (prior_result) {
//     let report_div = make_report_div();
//     let root_node_id = prior_result.root_node_id;
//     let node_ids = prior_result.node_ids;

//     let test_result = {
//         report: report_div,
//         score: 0,
//         failed: true,
//         root_node_id: root_node_id,
//         node_ids: node_ids
//     };

//     report_div.p(`Testing retrieving node representation expanded to depth d. 
//     First gets root node at depth 0 and checks that result is same as getting without depth.
//     Then gets root node at depth 1 which should expand root's children but no farther. 
//     The at depth 2 which should further expand A's children. Depth 3 or higher expands all nodes.
//     `);

//     let root_node_depth_0 = await execute_get(report_div, '/nodes/' + root_node_id + '?depth=0');

//     if (root_node_depth_0.id != root_node_id ||
//         root_node_depth_0.children_ids == undefined ||
//         root_node_depth_0.children != undefined ||
//         !Array.isArray(root_node_depth_0.children_ids) ||
//         root_node_depth_0.children_ids.length != 3 ||
//         root_node_depth_0.children_ids[0] != node_ids['A'] ||
//         root_node_depth_0.children_ids[1] != node_ids['B'] ||
//         root_node_depth_0.children_ids[2] != node_ids['D']) {
//         report_div.p('Root node representation with depth = 0 incorrect, test failed');
//         return test_result;
//     }

//     let root_node_depth_1 = await execute_get(report_div, '/nodes/' + root_node_id + '?depth=1');
//     if (root_node_depth_1.id != root_node_id ||
//         root_node_depth_1.children_ids != undefined ||
//         root_node_depth_1.children == undefined ||
//         !Array.isArray(root_node_depth_1.children) ||
//         root_node_depth_1.children.length != 3 ||
//         root_node_depth_1.children[0].id != node_ids['A'] ||
//         root_node_depth_1.children[1].id != node_ids['B'] ||
//         root_node_depth_1.children[2].id != node_ids['D'] ||
//         root_node_depth_1.children[0].children_ids == undefined ||
//         !Array.isArray(root_node_depth_1.children[0].children_ids) ||
//         root_node_depth_1.children[0].children_ids.length != 1 ||
//         root_node_depth_1.children[0].children_ids[0] != node_ids['C'] ||
//         root_node_depth_1.children[1].children_ids == undefined ||
//         !Array.isArray(root_node_depth_1.children[1].children_ids) ||
//         root_node_depth_1.children[1].children_ids.length != 0 ||
//         root_node_depth_1.children[2].children_ids == undefined ||
//         !Array.isArray(root_node_depth_1.children[2].children_ids) ||
//         root_node_depth_1.children[2].children_ids.length != 0) {

//         report_div.p('Root node representation with depth = 1 incorrect, test failed');
//         return test_result;
//     }

//     let root_node_depth_2 = await execute_get(report_div, '/nodes/' + root_node_id + '?depth=2');

//     if (root_node_depth_2.children[0].children_ids != undefined ||
//         root_node_depth_2.children[0].children == undefined ||
//         !Array.isArray(root_node_depth_2.children[0].children) ||
//         root_node_depth_2.children[0].children.length != 1 ||
//         root_node_depth_2.children[0].children[0].id != node_ids['C'] ||
//         root_node_depth_2.children[0].children[0].children_ids == undefined ||
//         !Array.isArray(root_node_depth_2.children[0].children[0].children_ids) ||
//         root_node_depth_2.children[0].children[0].children_ids.length != 0) {

//         report_div.p('Root node representation with depth = 2 incorrect, test failed');
//         return test_result;
//     }

//     let root_node_depth_3 = await execute_get(report_div, '/nodes/' + root_node_id + '?depth=3');
//     if (root_node_depth_3.children[0].children[0].children_ids != undefined ||
//         root_node_depth_3.children[0].children[0].children == undefined ||
//         !Array.isArray(root_node_depth_3.children[0].children[0].children) ||
//         root_node_depth_3.children[0].children[0].children.length != 0) {

//         report_div.p('Root node representation with depth = 3 incorrect, test failed');
//         return test_result;
//     }

//     let root_node_depth_100 = await execute_get(report_div, '/nodes/' + root_node_id + '?depth=100');
//     if (root_node_depth_100.children[0].children[0].children_ids != undefined ||
//         root_node_depth_100.children[0].children[0].children == undefined ||
//         !Array.isArray(root_node_depth_100.children[0].children[0].children) ||
//         root_node_depth_100.children[0].children[0].children.length != 0) {

//         report_div.p('Root node representation with depth = 100 incorrect, test failed');
//         return test_result;
//     }

//     test_result.failed = false;
//     test_result.score = 1.0;
//     return test_result;
// }

// tests[5] = async function (prior_result) {
//     let report_div = make_report_div();
//     let root_node_id = prior_result.root_node_id;
//     let node_ids = prior_result.node_ids;

//     let test_result = {
//         report: report_div,
//         score: 0,
//         failed: true,
//         root_node_id: root_node_id,
//         node_ids: node_ids
//     };

//     report_div.p(`Testing altering a node with put. In this test, the B node is altered
//     to include C as a child as well as change the headline and note. The parents of C are checked to
//     see if both A and B are included.
//     `);

//     let updated_node_b = await execute_put(report_div, '/nodes/' + node_ids['B'], {
//         headline: "New B headline",
//         note: "New B note",
//         children_ids: [node_ids['C']]
//     });

//     if (updated_node_b.headline != "New B headline" ||
//         updated_node_b.note != "New B note" ||
//         updated_node_b.children_ids.length != 1 ||
//         updated_node_b.children_ids[0] != node_ids['C']) {
//         report_div.p('Updated node B is incorrect. Test fails.');
//         return test_result;
//     }

//     let c_parents = await execute_get(report_div, '/parents/' + node_ids['C']);

//     if (c_parents.length != 2 ||
//         !c_parents.includes(node_ids['A']) ||
//         !c_parents.includes(node_ids['B'])
//     ) {
//         report_div.p('Expected C to now have two parents (A and B). Test fails.');
//         return test_result;
//     }

//     test_result.failed = false;
//     test_result.score = 1;
//     return test_result
// }

// tests[6] = async function (prior_result) {
//     let report_div = make_report_div();
//     let root_node_id = prior_result.root_node_id;
//     let node_ids = prior_result.node_ids;

//     let test_result = {
//         report: report_div,
//         score: 0,
//         failed: true,
//         root_node_id: root_node_id,
//         node_ids: node_ids
//     };

//     report_div.p(`
//     Testing implicit deleting of a node. Root node is update to remove D as a
//     child. D now has no parent and should not be retrievable. 
//     `);

//     let updated_root = await execute_put(report_div, '/nodes/' + root_node_id, {
//         headline: "",
//         note: "",
//         children_ids: [node_ids['A'], node_ids['B']]
//     });

//     if (updated_root.children_ids.length != 2 ||
//         !updated_root.children_ids.includes(node_ids['A']) ||
//         !updated_root.children_ids.includes(node_ids['B'])
//     ) {
//         report_div.p('Error updating root node. Test fails.');
//         return test_result;
//     }

//     let node_d = await execute_get(report_div, '/nodes/' + node_ids['D']);

//     if (node_d != null) {
//         report_div.p('Node D still seems to be available. Test fails.');
//         return test_result;
//     } else {
//         report_div.p('Attempt to retrieving D failed as expected.');
//     }

//     test_result.score = 1;
//     test_result.failed = false;

//     return test_result;
// }

// tests[7] = async function (prior_result) {
//     let report_div = make_report_div();
//     let root_node_id = prior_result.root_node_id;
//     let node_ids = prior_result.node_ids;

//     let test_result = {
//         report: report_div,
//         score: 0,
//         failed: true,
//         root_node_id: root_node_id,
//         node_ids: node_ids
//     };

//     report_div.p(`
//     A trickier delete test. Root node is updated to not have A as a child.
//     This should implicitly delete A and make A unavailable. Check C to see if
//     A still shows up as a parent (it shouldn't). 
//     `);

//     let updated_root = await execute_put(report_div, '/nodes/' + root_node_id, {
//         headline: "",
//         note: "",
//         children_ids: [node_ids['B']]
//     });

//     if (updated_root.children_ids.length != 1 ||
//         updated_root.children_ids[0] != node_ids['B']
//     ) {
//         report_div.p('Root did not update as expected. Test fails.');
//         return test_result;
//     }

//     let c_parents = await execute_get(report_div, '/parents/' + node_ids['C']);
//     if (c_parents.length != 1 ||
//         c_parents[0] != node_ids['B']
//     ) {
//         report_div.p('C should only have B as parent now. Test fails.');
//         return test_result;
//     }

//     test_result.score = 1;
//     test_result.failed = false;
//     return test_result;
// }

// tests[8] = async function (prior_result) {
//     let report_div = make_report_div();
//     let root_node_id = prior_result.root_node_id;
//     let node_ids = prior_result.node_ids;

//     let test_result = {
//         report: report_div,
//         score: 0,
//         failed: true,
//         root_node_id: root_node_id,
//         node_ids: node_ids
//     };

//     report_div.p(`
//     In this test, we create a cycle by creating a new node E as a child of C. 
//     E is created with B as a child. This should create a cycle B->C->E->back to B.
//     `);

//     let node_e = await execute_post(report_div, '/nodes', {
//         headline: 'Node E',
//         note: '',
//         children_ids: [node_ids['B']],
//         parent_id: node_ids['C']
//     });
//     node_ids['E'] = node_e.id;

//     let b_parents = await execute_get(report_div, '/parents/' + node_ids['B']);
//     if (b_parents.length != 2 ||
//         !b_parents.includes(root_node_id) ||
//         !b_parents.includes(node_ids['E'])
//     ) {
//         report_div.p('Expected Node B to have both root node and new node E as parents. Test failed.');
//         return test_result;
//     }

//     let node_index = await execute_get(report_div, '/nodes');
//     if (node_index.length != 4 ||
//         node_index[0] != root_node_id ||
//         node_index[1] != node_ids['B'] ||
//         node_index[2] != node_ids['C'] ||
//         node_index[3] != node_ids['E']
//     ) {
//         report_div.p('Node index with cycle incorrect. Test failed.');
//         return test_result;
//     }

//     let c_depth3 = await execute_get(report_div, '/nodes/' + node_ids['C'] + '?depth=3');

//     if (c_depth3.children[0].id != node_ids['E'] ||
//         c_depth3.children[0].children[0].id != node_ids['B'] ||
//         c_depth3.children[0].children[0].children[0].id != node_ids['C'] ||
//         c_depth3.children[0].children[0].children[0].children_ids[0] != node_ids['E']
//     ) {
//         report_div.p('Retrieving C expanded to depth 3 does not reflect cycle properly. Test failed');
//         return test_result;
//     }

//     test_result.score = 1;
//     test_result.failed = false;
//     return test_result;
// }

// tests[9] = async function (prior_result) {
//     let report_div = make_report_div();
//     let root_node_id = prior_result.root_node_id;
//     let node_ids = prior_result.node_ids;

//     let test_result = {
//         report: report_div,
//         score: 0,
//         failed: true,
//         root_node_id: root_node_id,
//         node_ids: node_ids
//     };

//     report_div.p(`
//     In this test, we disconnect the B->C->E cycle from the root node by 
//     removing B as a child of the root. This should implicitly delete B, C, and E.
//     `);

//     let updated_root = await execute_put(report_div, '/nodes/'+root_node_id, {
//         headline: "",
//         note: "",
//         children_ids: []
//     });

//     if (updated_root.children_ids.length != 0) {
//         report_div.p('Expected root node to have no children. Test fails.');
//         return test_result;
//     }

//     let node_index = await execute_get(report_div, '/nodes');

//     if (node_index.length != 1 ||
//         node_index[0] != root_node_id
//     ) {
//         report_div.p('Expected node index to include just root node. Test fails.');
//         return test_result;
//     }

//     let node_b = await execute_get(report_div, '/nodes/'+node_ids['B']);
//     if (node_b != null) {
//         report_div.p('Expected retrieval of B to fail but seems to have returned something. Test fails.');
//         return test_result;
//     }

//     let node_c = await execute_get(report_div, '/nodes/'+node_ids['C']);
//     if (node_c != null) {
//         report_div.p('Expected retrieval of C to fail but seems to have returned something. Test fails.');
//         return test_result;
//     }

//     let node_e = await execute_get(report_div, '/nodes/'+node_ids['E']);
//     if (node_e != null) {
//         report_div.p('Expected retrieval of E to fail but seems to have returned something. Test fails.');
//         return test_result;
//     }

//     test_result.score = 1;
//     test_result.failed = false;
//     return test_result;
// }
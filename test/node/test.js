const AssertionError = class extends Error {
  constructor(...args) {
    super(...args);
    this.name = "AssertionError";
  }
}
const print = function (msg) {
  console.log(msg);
};
const print_assertion = function (msg) {
  console.log("Testing if: " + msg + "...");
};
const print_error = function (msg) {
  console.log("Error: ", msg);
}
const localStorage_test = async function () {
  try {
    print("Starting main test of UFS (Universal Filesystem) (mode: localStorage)");
    print_assertion("It can create an instance");
    const UFS_manager = require(__dirname + "/../../dist/ufs.js");
    const ufs = UFS_manager.driver("node").create();
    global.ufs = ufs;
    print_assertion("It can find every method as function");
    Test: {
      if (typeof ufs.resolve_path !== "function") throw new AssertionError("error finding method «resolve_path»");
      if (typeof ufs.get_current_directory !== "function") throw new AssertionError("error finding method «get_current_directory»");
      if (typeof ufs.make_directory !== "function") throw new AssertionError("error finding method «make_directory»");
      if (typeof ufs.change_directory !== "function") throw new AssertionError("error finding method «change_directory»");
      if (typeof ufs.write_file !== "function") throw new AssertionError("error finding method «write_file»");
      if (typeof ufs.read_directory !== "function") throw new AssertionError("error finding method «read_directory»");
      if (typeof ufs.read_file !== "function") throw new AssertionError("error finding method «read_file»");
      if (typeof ufs.delete_file !== "function") throw new AssertionError("error finding method «delete_file»");
      if (typeof ufs.delete_directory !== "function") throw new AssertionError("error finding method «delete_directory»");
      if (typeof ufs.exists !== "function") throw new AssertionError("error finding method «exists»");
      if (typeof ufs.is_file !== "function") throw new AssertionError("error finding method «is_file»");
      if (typeof ufs.is_directory !== "function") throw new AssertionError("error finding method «is_directory»");
    }
    const node = ".";
    const contents = "blablabla";
    print_assertion("It can use «resolve_path» adequately");
    Test: {
      console.log(ufs.resolve_path("8/", "9/10/11////12/13"))
      Normal_behaviour: {
        if (ufs.resolve_path("/8/9///10", "11////12/13") !== "/8/9/10/11/12/13") throw new AssertionError("error resolving paths (1)");
        if (ufs.resolve_path("/8/", "9/10/11////12/13") !== "/8/9/10/11/12/13") throw new AssertionError("error resolving paths (2)");
        if (ufs.resolve_path("/8/9///10", "11////12/13") !== "/8/9/10/11/12/13") throw new AssertionError("error resolving paths (3)");
        if (ufs.resolve_path("/8/9///10", "11////12/13") !== "/8/9/10/11/12/13") throw new AssertionError("error resolving paths (4)");
        if (ufs.resolve_path("/8/9///10", "11////12/13") !== "/8/9/10/11/12/13") throw new AssertionError("error resolving paths (5)");
        if (ufs.resolve_path("/8/9///10", "11////12/13") !== "/8/9/10/11/12/13") throw new AssertionError("error resolving paths (6)");
        if (ufs.resolve_path("/8/9///10", "11////12/13") !== "/8/9/10/11/12/13") throw new AssertionError("error resolving paths (7)");
      }
      Double_dot_behaviour: {
        if (ufs.resolve_path("/1/2/3/4/5/..") !== "/1/2/3/4") throw new AssertionError("error resolving double dot (1)");
        if (ufs.resolve_path("/1/2/3/4/5/../..") !== "/1/2/3") throw new AssertionError("error resolving double dot (2)");
        if (ufs.resolve_path("/1/2/3/4/5/../../..") !== "/1/2") throw new AssertionError("error resolving double dot (3)");
        if (ufs.resolve_path("/1/2/3/4/5/../../../..") !== "/1") throw new AssertionError("error resolving double dot (4)");
        if (ufs.resolve_path("/1/2/3/4/5/../../../../..") !== "/") throw new AssertionError("error resolving double dot (5)");
        if (ufs.resolve_path("/1/2/3/4/5/../../../../../..") !== "/") throw new AssertionError("error resolving double dot (6)");
      }
    }
    print_assertion("It can use «make_directory», «get_current_directory» and «change_directory» adequately");
    Test: {
      await ufs.change_directory(__dirname);
      if (await ufs.get_current_directory() !== process.cwd()) throw new AssertionError("error getting current directory at the begining");
      // await ufs.delete_directory("wherever");
      await ufs.make_directory("wherever");
      await ufs.change_directory("wherever");
      if (!await ufs.get_current_directory().endsWith("/wherever")) throw new AssertionError("error getting current directory once moved down");
      await ufs.change_directory("..");
      if (await ufs.get_current_directory().endsWith("/wherever")) throw new AssertionError("error getting current directory once movep up");
      await ufs.delete_directory("wherever");
    }
    print_assertion("It can use «read_directory», «make_directory» and «delete_directory");
    Test: {
      await ufs.make_directory("directorio_1");
      await ufs.make_directory("directorio_2");
      await ufs.make_directory("directorio_3");
      const subnodes = await ufs.read_directory(".");
      if (!("directorio_1" in subnodes)) throw new AssertionError("error making or reading directory (1)");
      if (!("directorio_2" in subnodes)) throw new AssertionError("error making or reading directory (2)");
      if (!("directorio_3" in subnodes)) throw new AssertionError("error making or reading directory (3)");
      await ufs.delete_directory("directorio_1");
      await ufs.delete_directory("directorio_2");
      await ufs.delete_directory("directorio_3");
    }
    /*
    const result_2 = await ufs.make_directory(node);
    const result_4 = await ufs.write_file(node, contents);
    const result_5 = await ufs.read_directory(node);
    const result_6 = await ufs.read_file(node);
    const result_7 = await ufs.delete_file(node);
    const result_8 = await ufs.delete_directory(node);
    const result_9 = await ufs.exists(node);
    const result_10 = await ufs.is_file(node);
    const result_11 = await ufs.is_directory(node);
    //*/
    print_assertion("It can pass a dirty test touching all methods");
    Dirty_test: {
      // Clean the space:
      print_assertion("It can use «delete_directory»");
      // await ufs.delete_directory(".");
      print_assertion("It can use «change_directory»");
      // await ufs.change_directory("/");
      print_assertion("It can use «read_directory»");
      const files1 = await ufs.read_directory(".");
      print_assertion("It can use «make_directory»");
      await ufs.make_directory("dir1");
      await ufs.make_directory("dir2");
      await ufs.make_directory("dir3");
      await ufs.make_directory("dir4");
      await ufs.make_directory("dir5");
      print_assertion("It can use «read_directory»");
      const files2 = await ufs.read_directory(".");
      if (Object.keys(files2).length < 5) throw new AssertionError("dirty test assertion 2");
      print_assertion("It can use «write_file»");
      await ufs.write_file("file1", "whereveeeeee");
      const contents1 = await ufs.read_file("file1");
      if (typeof contents1 !== "string") throw new AssertionError("dirty test assertion 3");
      if (contents1.length === 0) throw new AssertionError("dirty test assertion 4");
      if (contents1 !== "whereveeeeee") throw new AssertionError("dirty test assertion 5");
      print_assertion("It can use «is_file»");
      if (!await ufs.is_file("file1")) throw new AssertionError("dirty test assertion 6");
      print_assertion("It can use «is_directory»");
      if (!await ufs.is_directory("dir1")) throw new AssertionError("dirty test assertion 7");
      print_assertion("It can use «delete_file»");
      await ufs.delete_file("file1");
      print_assertion("It can use «exists»");
      if(await ufs.exists("file1")) throw new AssertionError("dirty test assertion 10");
      print_assertion("It can use «rename»");
      await ufs.rename("dir1", "dir_z");
      if (await ufs.exists("dir1")) throw new AssertionError("dirty test assertion 8");
      if (!await ufs.is_directory("dir_z")) throw new AssertionError("dirty test assertion 9");
      await ufs.delete_directory("dir_z");
      await ufs.delete_directory("dir2");
      await ufs.delete_directory("dir3");
      await ufs.delete_directory("dir4");
      await ufs.delete_directory("dir5");
    }
    print("Test finished without errors.");
  } catch (error) {
    print_error("There were errors: " + error.message);
    console.log(error);
    throw error;
  }
};
const idb_test = async () => {

};
const main_test = async () => {
  await idb_test();
  await localStorage_test();
};
module.exports = main_test();
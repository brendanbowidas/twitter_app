/* global utils, R */

// This file automatically exports all ".vue" files in the components directory
// and subdirectories and names them after their containing folder
function requireAll(requireContext) {
  const keys = requireContext.keys().map((key) => key.split('/')[1])
  const modules = requireContext.keys().map(requireContext)
  return R.zipObj(keys, modules)
}

module.exports = requireAll(require.context('./', true, /^\.\/.*\.vue$/))

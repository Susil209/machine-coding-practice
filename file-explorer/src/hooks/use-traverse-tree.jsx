import { v4 as uuidv4 } from "uuid";

// Create custom hooks
const useTraverseTree = () => {
    // Add a file or folder in tree
    const insertNode = (tree,folderId,item,isFolder) => {

        // edge case
        if(tree.id === folderId && tree.isFolder) {
            // add a new folder at first position
            tree.items.unshift({
                id: uuidv4(),
                name: item,
                isFolder: isFolder,
                items: []
            });

            return tree;
        }

        // create a new folder/file object for children(nested folders)
        let latestNode = [];
        latestNode = tree.items.map(function(ob) {
            // recursively call children
            return insertNode(ob, folderId, item, isFolder);
        })

        // append the latest node
        return {...tree, items: latestNode};

    }

    const updateNode = (tree, folderId, item) => {
        if (tree.id === folderId) {
            tree.name = item;
            return tree;
        }

        let updatedItem = [];
        updatedItem = tree.items.map((obj) => {
            return updateNode(obj, folderId, item);
        });

        return { ...tree, items: updatedItem };
    }

    const deleteNode = (tree, folderId) => {
        if (tree.id === folderId) {
          return null;
        }
    
        let filteredTree = [];
        filteredTree = tree.items
          .filter((item) => item.id !== folderId)
          .map((item) => deleteNode(item, folderId));
    
        return { ...tree, items: filteredTree };
      }

    return {insertNode, updateNode, deleteNode};
}

export default useTraverseTree;
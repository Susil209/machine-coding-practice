
import { useState } from 'react'
import explorer from './data/folderData'
import Folder from './components/Folder';
import useTraverseTree from './hooks/use-traverse-tree';


function App() {

  const [explorerData,setExplorerData] = useState(explorer)

  console.log(explorerData);

  // use custom hooks 
  const {insertNode, updateNode, deleteNode} = useTraverseTree();

  // handle insert node
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  }

  // handle delete
  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  }

  //handle update
  const handleUpdateNode = (folderId,item) => {
    const finalTree = updateNode(explorerData, folderId, item);
    setExplorerData(finalTree);
  }

 
  return(
    <div className='App'>
      <Folder handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} handleUpdateNode={handleUpdateNode} data={explorerData}/>
    </div>
  )

}

export default App

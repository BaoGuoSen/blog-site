/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig
} from '@wangeditor/editor'

import { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

interface IProps {
  height?: number
  /**
   * 富文本内容变更时的回调
   */
  onChange?: (val: string) => void
  value?: string
  /**
   * 自定义上传文件接口
   * params: { file: File }
   * return Promise<string>
   */
  upload?: (params: { file: File }) => Promise<string>
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const FormEditor: React.FC<IProps> = ({
  height = 400,
  value,
  onChange = () => {},
  upload = () => {}
}) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null)

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      // 视频
      'group-video',
      // 对齐
      'group-justify',
      // 缩进
      'group-indent',
      // 代码块
      'codeBlock',
      // 表情
      'emotion',
      // 链接
      'insertLink',
      // 代办
      'todo',
      // 表格
      'insertTable',
      // 分割线
      'divider',
      // 有序列表
      'numberedList',
      // 无序列表
      'bulletedList',
      // 网格图片
      'insertImage'
    ]
  }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    maxLength: 100000,
    /**
     * 上传图片配置
     * @see https://www.wangeditor.com/v5/menu-config.html#%E5%9B%BE%E7%89%87
     */
    MENU_CONF: {
      uploadImage: {
        // 自定义上传
        async customUpload(file: File, insertFn: any) {
          const url = await upload({ file })

          insertFn(url)
        }
      }
    }
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  // console.log(editor?.getAllMenuKeys(), 'edotor');
  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={value}
          onCreated={setEditor}
          onChange={(editor) => {
            const value = editor.getHtml()
            if (value === '<p><br></p >') {
              onChange('')
              return
            }

            onChange(value)
          }}
          mode="default"
          style={{ height, overflowY: 'hidden' }}
        />
      </div>
    </>
  )
}

export default FormEditor

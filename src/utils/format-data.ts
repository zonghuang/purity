export const formatData = (data: any, url: string, payload: any) => {
  let filterData: any = null
  // 表格数据
  if (payload.pageNo) {
    const { records, total } = data.data
    filterData = { tableData: records, total }
  }

  return filterData ?? data
}

from django.core.paginator import Paginator

from mytcl.settings import COUNTOFPAGE, PAGERANGE


def page_list(data,page):
    data = data
    paginator = Paginator(data,COUNTOFPAGE)
    page =int(page)
    # 参数是当前页码
    pager = paginator.page(page)
    # 自定义页码范围
    if paginator.num_pages > PAGERANGE:
        if page - 5 <= 0:
            my_page_range = range(1, 11)
        elif page + 4 > paginator.num_pages:
            my_page_range = range(paginator.num_pages - 9, paginator.num_pages + 1)
        else:
            my_page_range = range(page - 5, page + 5)
    else:  # 总页数小于PAGERANGE
        my_page_range = paginator.page_range
    pager.page_range = my_page_range
    page_list = []
    page_list.append(pager)
    return page_list


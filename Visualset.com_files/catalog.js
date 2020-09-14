function showPreview(productId, size)
{
    productId = parseInt(productId);
    var url = '/index.php?option=com_catalog&task=show_image&product=' + productId + '&type=' + size;
    $('#dragndrop-box').html('<img src="' + url + '" />');
}